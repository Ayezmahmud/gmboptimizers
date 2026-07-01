
-- Revoke broad EXECUTE on SECURITY DEFINER functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.log_item_changes() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.log_order_changes() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
-- has_role must remain callable by signed-in users (used by admin RLS checks and client)
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;

-- Storage: remove broad public SELECT on service-images to prevent listing.
-- Public URLs continue to work because the bucket itself is public.
DROP POLICY IF EXISTS "Anyone can view service images" ON storage.objects;
