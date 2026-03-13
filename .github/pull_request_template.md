## Resumo
Descreva de forma curta o que mudou e por que essa alteracao foi feita.

## Tipo de PR
- [ ] `redesign-site -> staging` (validacao de layout e comportamento)
- [ ] `staging -> main` (publicacao)
- [ ] Hotfix

## Checklist Geral
- [ ] Branch de origem e destino conferidas
- [ ] `npm ci` executado com sucesso
- [ ] `npm run lint` sem erros
- [ ] `npm run build` sem erros
- [ ] Testado em desktop e mobile
- [ ] Sem erros no console do navegador
- [ ] Sem arquivos temporarios, logs ou debug leftovers

## Checklist de Design (`redesign-site -> staging`)
- [ ] Layout revisado em telas pequenas e grandes
- [ ] Cores e tipografia consistentes entre secoes
- [ ] Hover, foco e estados interativos revisados
- [ ] Acessibilidade basica validada (contraste e navegacao por teclado)
- [ ] Imagens/ativos otimizados (sem peso desnecessario)

## Checklist de Publicacao (`staging -> main`)
- [ ] Homologacao aprovada em `staging`
- [ ] PR com diff revisado e sem mudancas inesperadas
- [ ] Sem conflitos com `main`
- [ ] Plano de rollback definido (revert do merge ou tag anterior)

## Evidencias
- Prints ou gravacoes (quando houver mudanca visual relevante)
- Links de preview/deploy (quando disponiveis)

## Observacoes
Inclua riscos conhecidos, pendencias e itens fora de escopo.