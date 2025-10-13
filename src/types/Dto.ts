export type CondominioDto = {
  nome: string;
  cnpj: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  estado: string;
  municipio: string;
  cep: string;
  nomeAdm: string;
  cpfAdm: string;
  emailAdm: string;
  celularAdm: string;
  senhaAdm: string;
  moradores: MoradorDto[];
};

export type MoradorDto = {
  id: number;
  nome: string;
  cpf: string;
  celular: string;
  email: string;
  dataNascimento?: string;
  unidade: string;
  ehEntragador: boolean;
  senha: string;
  condominioId: number;
  condominio: CondominioDto;
  pedidos: PedidosDto[];
};

export type PedidosDto = {
  id: number;
  plataforma: string;
  descricao: string;
  previsaoChegada?: Date;
  localEntrega: string;
  status: string;
  moradorId: number;
  morador: MoradorDto;
};
