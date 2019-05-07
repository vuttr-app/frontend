# language: pt
Funcionalidade: Listar todas as ferramentas

  Cenário: Não existem ferramentas
      Dado que não existem ferramentas
    Quando eu solicito a lista de todas as ferramentas
     Então eu verifico que nenhuma ferramenta é apresentada

  Cenário: Existe uma ferramenta
      Dado que existe uma ferramenta
    Quando eu solicito a lista de todas as ferramentas
     Então eu verifico que a lista apresentada possui uma ferramenta

  Cenário: Existe mais que uma ferramenta
      Dado que existe mais que uma ferramenta
    Quando eu solicito a lista de todas as ferramentas
     Então eu verifico que mais que uma ferramenta são apresentadas
