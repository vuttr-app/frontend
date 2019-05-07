# language: pt
Funcionalidade: Adicionar nova ferramenta

  Cenário: Não existem ferramentas
      Dado que não existem ferramentas
    Quando eu solicito a adição de uma nova ferramenta
     Então eu verifico que a lista apresentada possui uma ferramenta

  Cenário: Existe uma ferramenta
      Dado que existe uma ferramenta
    Quando eu solicito a adição de uma nova ferramenta
     Então eu verifico que mais que uma ferramenta são apresentadas

  Cenário: Existe mais que uma ferramenta
      Dado que existe mais que uma ferramenta
    Quando eu solicito a adição de uma nova ferramenta
     Então eu verifico exatamente três ferramentas são apresentadas
