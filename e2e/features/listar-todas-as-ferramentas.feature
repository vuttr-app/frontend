# language: pt
Funcionalidade: Listar todas as ferramentas

  Esquema do Cenário: Listar todas as ferramentas
      Dado que <ferramentas-existentes>
    Quando eu solicito a lista de todas as ferramentas
     Então eu verifico que <ferramentas-apresentadas>

  Exemplos:
  | ferramentas-existentes         | ferramentas-apresentadas                  |
  | não existem ferramentas        | nenhuma ferramenta é apresentada          |
  | existe uma ferramenta          | a lista apresentada possui uma ferramenta |
  | existe mais que uma ferramenta | mais que uma ferramenta são apresentadas  |

