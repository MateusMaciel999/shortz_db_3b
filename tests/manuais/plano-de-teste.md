# Plano de Teste — Shortz-App

## 1. Identificação
- **Projeto:** Shortz-App
- **Versão:** 1.0
- **Autores:** Enzo Camelo Vieira, Fernando Hoffman da Silva, Thauã Brandão da Silva, Gabriel Luís de Santana, Mateus Silveira Maciel
- **Data de criação:** 10/03/2024
- **Objetivo:** Garantir que as funcionalidades core (autenticação, upload de vídeos de 1 min e interações sociais) operem conforme as regras de negócio, assegurando a integridade dos dados e a segurança contra ataques básicos (XSS/CSRF).

## 2. Escopo
### O que SERÁ testado
- Cadastro de usuários e validação de campos (RN-001).
- Autenticação e persistência de sessão (RN-002).
- Upload de vídeos (limite de 60s) e capas (RN-004).
- Streaming de vídeo via HTTP range requests (RN-005).
- Playlists privadas (RN-008).
- Interações (Likes e Comentários lineares) (RN-006).

### O que NÃO será testado (nesta fase)
- Painel Administrativo de moderação (RF-029 a RF-032).
- Recuperação de senha via e-mail.
- Testes de carga massiva (stress test).

## 3. Estratégia
### Níveis de Teste
- **Unitários:** Validação de formato de e-mail, força de senha e helpers de cálculo de tempo.
- **Integração:** Testes das rotas Express (`/auth`, `/videos`, `/playlists`) utilizando **Supertest** para validar o banco de dados MySQL e o armazenamento de arquivos (Multer).

### Ferramentas
- Vitest, Supertest, c8/coverage, GitHub Actions.

## 4. Riscos Identificados

Abaixo, os riscos identificados baseados nas features do sistema:

| ID | Descrição do Risco | Feature | Categoria | Prob. | Impacto | Prioridade |
|:---:|:---|:---|:---|:---:|:---:|:---:|
| **R-01** | Cadastro permite e-mails ou nomes de usuário duplicados. | Gestão de Usuários | Funcional | Média | Crítico | **Crítica** |
| **R-02** | Senha armazenada sem hash (texto plano) no banco de dados. | Gestão de Usuários | Não-Func. (Seg.) | Baixa | Crítico | **Alta** |
| **R-03** | Upload de vídeo aceita arquivos com mais de 60 segundos. | Upload de Vídeos | Funcional | Alta | Médio | **Alta** |
| **R-04** | Capa do vídeo aceita arquivos > 2MB ou em formatos não suportados. | Upload de Vídeos | Funcional | Média | Médio | **Média** |
| **R-05** | Streaming de vídeo falha por não suportar Range Requests (206). | Vídeo Player | Técnico | Média | Alto | **Alta** |
| **R-06** | Comentário aceita scripts maliciosos (falha de sanitização XSS). | Interações | Não-Func. (Seg.) | Média | Crítico | **Crítica** |
| **R-07** | Usuário consegue curtir o mesmo vídeo várias vezes via API. | Interações | Funcional | Alta | Baixo | **Média** |
| **R-08** | Playlist privada pode ser visualizada por outros usuários via URL. | Playlists | Não-Func. (Seg.) | Baixa | Crítico | **Alta** |
| **R-09** | Feed global falha em carregar quando não há vídeos (estado vazio). | Feed | Funcional | Média | Médio | **Média** |
| **R-10** | Acesso às rotas de `/upload` sem autenticação de sessão ativa. | Segurança Geral | Técnico | Baixa | Crítico | **Alta** |

## 5. Recursos e Ambiente
- **Ambiente:** Node.js 20+, MySQL local, Vitest + Supertest.
- **Dados de teste:** Fixtures de usuários (admin/comum) e vídeos curtos (< 10MB).
- **CI:** GitHub Actions executando `npm test` a cada Push na `main`.

## 6. Cronograma
| Semana | Atividade | Entrega |
|:---:|:---|:---|
| 4 | Protótipo do Plano (esta aula) | plano-de-teste.md |
| 5 | Casos de teste manuais (Cadastro e Upload) | casos-de-teste.md |
| 6 | Plano de Teste finalizado | Entrega 1 |

## 7. Critérios de Entrada e Saída
- **Entrada:** Ambiente configurado, banco MySQL migrado e rotas de Auth e Video implementadas.
- **Saída:** Cobertura de código ≥ 70% e 100% de sucesso nos testes de prioridade **Crítica**.
- **Suspensão:** Falha crítica na conexão com o banco de dados que impeça qualquer transação.