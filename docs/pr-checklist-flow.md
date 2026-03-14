# Fluxo de Branches e Checklist de PR

Este projeto usa o fluxo abaixo para evolucao do design com mais seguranca:

1. `redesign-site`: desenvolvimento das mudancas
2. `staging`: validacao/homologacao
3. `main`: publicacao em producao

## Fluxo recomendado

1. Fazer commits em `redesign-site`
2. Abrir PR `redesign-site -> staging`
3. Validar e aprovar em `staging`
4. Abrir PR `staging -> main`
5. Publicar apos aprovacao final

## Comandos de validacao antes do PR

```bash
npm ci
npm run lint
npm run build
```

## Template automatico de PR

O arquivo `.github/pull_request_template.md` aplica um checklist padrao na abertura de PR.
Use o mesmo checklist para garantir consistencia entre as versoes.
