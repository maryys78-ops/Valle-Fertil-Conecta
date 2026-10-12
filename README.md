# Valle Fértil Conecta

## Activar pedidos compartidos

La página usa Supabase para que los pedidos sean los mismos en todos los dispositivos.

1. Creá un proyecto en [Supabase](https://supabase.com/) y abrí **SQL Editor**.
2. Copiá y ejecutá todo el contenido de `supabase.sql`. Esto crea la tabla y carga los tres pedidos iniciales de ejemplo.
3. La URL del proyecto y la clave pública **Publishable** (`sb_publishable_...`) ya están configuradas en `index.html`. Si conectás otro proyecto, reemplazá las constantes `SUPABASE_URL` y `SUPABASE_ANON_KEY` con sus valores. Nunca uses una clave `secret` o `service_role`.
4. El sitio ya está publicado desde la rama `main` y la carpeta `/ (root)` de `maryys78-ops/Valle-Fertil-Conecta`. Los cambios futuros en esa rama se publican automáticamente.

Enlace para compartir:
`https://maryys78-ops.github.io/Valle-Fertil-Conecta/`

La política de `supabase.sql` permite que cualquier persona vea, cree, acepte y elimine pedidos, como se solicitó. No guardes datos sensibles de los solicitantes.
