#!/bin/bash
DIR=~/meu-site-otaku/otakuplay.me
echo "Corrigindo links no index.html..."
sed -i -e 's|href="ver-todos.html"|href="lista.html"|g' -e 's|href="ranking.html"|href="ranking.html"|g' -e 's|href="login.html"|href="login.html"|g' $DIR/index.html
echo "Corrigindo links no lista.html..."
sed -i -e 's|href="anime.html"|href="anime6e85.html"|g' -e 's|href="episodios.html"|href="episodios.html"|g' $DIR/lista.html
echo "Corrigindo links no ranking.html..."
sed -i -e 's|href="#"|href="index.html"|g' $DIR/ranking.html
echo "Corrigindo links no login.html..."
sed -i -e 's|href="#"|href="index.html"|g' $DIR/login.html
echo "Correções concluídas."
