type Address = {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
};
export async function getAddressByCep(cep: string): Promise<Address | null> {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

  if (!response.ok) {
    throw new Error('Erro ao buscar CEP');
  }
  const data = await response.json();
  return data as Address;
}
