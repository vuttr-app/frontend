Feature: List all tools

  Scenario Outline: List all tools
    Given que <ferramentas-existentes>
     When eu solicito a lista de todas as ferramentas
     Then eu verifico que <ferramentas-apresentadas>

  Examples:
  | ferramentas-existentes         | ferramentas-apresentadas                  |
  | não existem ferramentas        | nenhuma ferramenta é apresentada          |
  | existe uma ferramenta          | a lista apresentada possui uma ferramenta |
  | existe mais que uma ferramenta | mais que uma ferramenta são apresentadas  |

