# Valle Fértil Conecta

## Activar pedidos compartidos

La página usa Supabase para que los pedidos sean los mismos en todos los dispositivos.

1. Creá un proyecto en [Supabase](https://supabase.com/) y abrí **SQL Editor**.
2. Copiá y ejecutá todo el contenido de `supabase.sql`. Esto crea la tabla y carga los tres pedidos iniciales de ejemplo.
3. En Supabase, abrí **Project Settings → API** y copiá la URL del proyecto y la clave pública **anon**. Nunca uses ni publiques la clave `service_role`.
4. En `index.html`, reemplazá `PEGAR_URL_DEL_PROYECTO` y `PEGAR_CLAVE_PUBLICA_ANON` por esos dos valores.
5. Subí `index.html` al repositorio público `maryys78-ops/Valle-Fertil-Conecta`.
6. En GitHub, abrí **Settings → Pages**, seleccioná la rama `main` y la carpeta `/ (root)`, y guardá.

Cuando GitHub Pages termine de publicar, el enlace para compartir es:
`https://maryys78-ops.github.io/Valle-Fertil-Conecta/`

La política de `supabase.sql` permite que cualquier persona vea, cree, acepte y elimine pedidos, como se solicitó. No guardes datos sensibles de los solicitantes.
