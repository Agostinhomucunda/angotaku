#!/usr/bin/env bash
set -euo pipefail

# Corrige os aliases estáticos mais antigos do AngoTaku.
# Uso: ./corrige_links.sh [diretório-do-site]
ROOT="${1:-$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)}"
ROOT="$(cd -- "$ROOT" && pwd)"
CANONICAL="$ROOT/lista.php.html"
LEGACY_LIST="$ROOT/lista.html"
BLOCKER="$ROOT/assets/js/dev-blocker.js"

if [[ ! -f "$CANONICAL" ]]; then
  echo "Erro: catálogo canônico não encontrado: $CANONICAL" >&2
  exit 1
fi

# Usa cópia atômica para não deixar a página pela metade se o processo parar.
if ! cmp -s "$CANONICAL" "$LEGACY_LIST"; then
  tmp="$(mktemp "$ROOT/.lista.html.XXXXXX")"
  trap 'rm -f "$tmp"' EXIT
  cp "$CANONICAL" "$tmp"
  mv "$tmp" "$LEGACY_LIST"
  trap - EXIT
  echo "Atualizado: lista.html agora usa as rotas locais do catálogo canônico."
else
  echo "OK: lista.html já está sincronizado."
fi

cat > "$ROOT/animes.html" <<'HTML'
<!doctype html>
<html lang="pt">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="0; url=lista.php.html">
  <link rel="canonical" href="lista.php.html">
  <title>Catálogo de animes | AngoTaku</title>
  <script>window.location.replace('lista.php.html');</script>
</head>
<body><p>O catálogo foi movido. <a href="lista.php.html">Abrir a lista de animes</a>.</p></body>
</html>
HTML

if [[ -f "$BLOCKER" ]]; then
  cat > "$BLOCKER" <<'JS'
/* Compatibilidade legada: o bloqueio anti-DevTools foi desativado.
 * A versão anterior redirecionava para /blocked.php (inexistente) e bloqueava
 * atalhos e clique direito. O arquivo fica aqui para páginas já geradas.
 */
JS
fi

echo "Correções concluídas em: $ROOT"
