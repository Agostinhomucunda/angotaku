# Recuperação do AngoTaku

## Diagnóstico

O repositório contém principalmente um **arquivo estático** do site, não a aplicação PHP original. A inspeção encontrou 2.112 páginas HTML não temporárias, incluindo 129 páginas de anime e 1.925 páginas de episódio. Os nomes como `anime.php%3Ftitle=...html` e `player.php%3Ftitle=...&episode=...html` são capturas de URLs PHP guardadas como arquivos; não há os scripts PHP, banco de dados ou configuração de servidor necessários para voltar a executar a aplicação dinâmica.

A auditoria de links percorreu as páginas HTML e identificou 29 destinos locais ausentes. Vinte e seis estavam na cópia antiga `lista.html`, que apontava para nomes `anime<ID>.html` inexistentes; a lista `lista.php.html` já continha rotas estáticas correspondentes. Os links amostrados de anime e episódio foram servidos localmente com resposta HTTP 200, inclusive nomes com caracteres codificados.

## O que foi ajustado

- `lista.html` foi sincronizada com `lista.php.html`, eliminando os atalhos antigos quebrados e usando as páginas de anime que realmente estão no repositório.
- `animes.html`, que era uma página 404 capturada, agora encaminha para o catálogo e mantém um link de fallback.
- A captura do episódio 956 de *One Piece* teve os links de menu e de retorno ajustados para as páginas locais disponíveis, em vez de rotas PHP inexistentes.
- `assets/js/dev-blocker.js` não bloqueia mais teclas, clique direito ou DevTools nem envia visitantes para `/blocked.php`, que não existia. O arquivo permanece para compatibilidade com as páginas que o incluem.
- `corrige_links.sh` agora usa o diretório do repositório (ou um caminho informado como argumento), sem o caminho pessoal antigo do Termux.

## O que dá para salvar

- A navegação estática entre a página inicial, o catálogo, páginas de anime e páginas de episódio é recuperável; os arquivos de destino existentes podem continuar a ser usados num alojamento estático que aceite caminhos codificados.
- Há 1.925 capturas de episódio preservadas. Muitas incorporam o vídeo de um serviço externo (por exemplo, Blogger); o repositório não contém os vídeos, e a disponibilidade dos embeds depende desse serviço e dos seus tokens.
- Imagens, CSS e páginas HTML capturadas também permanecem no repositório. Os arquivos `.tmp` foram preservados para não apagar material possivelmente recuperável.

## O que não pode ser restaurado só com este repositório

- Execução PHP, autenticação/login, banco de dados e sessões de utilizador.
- Pesquisa, filtros, paginação e categorias que dependiam de parâmetros/processamento no servidor.
- Curtidas, histórico de episódios assistidos, relatórios e outras ações `ajax/*.php`.
- Vídeos que deixaram de existir no provedor externo.

Para recuperar essas funções seria necessário localizar uma cópia do backend (ficheiros `.php`, base de dados e configuração/credenciais de alojamento) noutro backup ou no Termux. Sem isso, a opção segura é continuar como site estático e reimplementar separadamente as funções interativas.

## Como aplicar no Termux

Depois de integrar esta recuperação no branch que usa, entre na pasta do repositório e execute:

```sh
bash corrige_links.sh
```

Também pode indicar outra cópia do site:

```sh
bash corrige_links.sh /caminho/para/o/site
```

O script só sincroniza os aliases estáticos identificados; ele não instala nem executa PHP.
