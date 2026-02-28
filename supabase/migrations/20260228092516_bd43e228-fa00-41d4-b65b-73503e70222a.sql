
-- Activity log table
CREATE TABLE public.activity_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  order_code TEXT NOT NULL,
  action TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view activity log"
  ON public.activity_log FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Trigger function for order changes
CREATE OR REPLACE FUNCTION public.log_order_changes()
  RETURNS trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.activity_log (order_id, order_code, action, details)
    VALUES (NEW.id, NEW.order_code, 'order_created',
      'New order from ' || NEW.customer_name || ' — $' || NEW.total_amount || ' AUD');
    RETURN NEW;
  END IF;

  IF TG_OP = 'UPDATE' THEN
    IF OLD.payment_status IS DISTINCT FROM NEW.payment_status THEN
      INSERT INTO public.activity_log (order_id, order_code, action, details)
      VALUES (NEW.id, NEW.order_code, 'payment_updated',
        'Payment changed from ' || REPLACE(OLD.payment_status, '_', ' ') || ' to ' || REPLACE(NEW.payment_status, '_', ' '));
    END IF;
    IF OLD.status IS DISTINCT FROM NEW.status THEN
      INSERT INTO public.activity_log (order_id, order_code, action, details)
      VALUES (NEW.id, NEW.order_code, 'status_updated',
        'Status changed from ' || REPLACE(OLD.status, '_', ' ') || ' to ' || REPLACE(NEW.status, '_', ' '));
    END IF;
    RETURN NEW;
  END IF;

  RETURN NULL;
END;
$$;

CREATE TRIGGER trg_log_order_changes
  AFTER INSERT OR UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.log_order_changes();

-- Trigger function for order item progress changes
CREATE OR REPLACE FUNCTION public.log_item_changes()
  RETURNS trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
AS $$
DECLARE
  v_order_code TEXT;
BEGIN
  SELECT order_code INTO v_order_code FROM public.orders WHERE id = NEW.order_id;

  IF TG_OP = 'UPDATE' THEN
    IF OLD.progress_percentage IS DISTINCT FROM NEW.progress_percentage THEN
      INSERT INTO public.activity_log (order_id, order_code, action, details)
      VALUES (NEW.order_id, COALESCE(v_order_code, ''), 'progress_updated',
        NEW.service_name || ' progress: ' || OLD.progress_percentage || '% → ' || NEW.progress_percentage || '%');
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_log_item_changes
  AFTER UPDATE ON public.order_items
  FOR EACH ROW EXECUTE FUNCTION public.log_item_changes();

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.activity_log;
