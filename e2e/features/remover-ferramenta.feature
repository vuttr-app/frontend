# language: pt
Funcionalidade: Remover ferramenta

  Cenário: Existe uma ferramenta
      Dado que existe uma ferramenta
    Quando eu solicito a remoção de uma nova ferramenta
     Então eu verifico que nenhuma ferramenta é apresentada

  Cenário: Existe mais que uma ferramenta
      Dado que existe mais que uma ferramenta
    Quando eu solicito a remoção de uma nova ferramenta
     Então eu verifico que a lista apresentada possui uma ferramenta
