/**
 * Banco de dados de rotas brasileiras
 * Contém distâncias reais entre cidades principais do Brasil
 */
const RoutesDB = {
    /**
     * Array de rotas com origem, destino e distância em km
     */
    routes: [
        // Rotas entre capitais - Sudeste
        { origin: "São Paulo, SP", destination: "Rio de Janeiro, RJ", distanceKm: 430 },
        { origin: "São Paulo, SP", destination: "Belo Horizonte, MG", distanceKm: 586 },
        { origin: "São Paulo, SP", destination: "Vitória, ES", distanceKm: 882 },
        { origin: "Rio de Janeiro, RJ", destination: "Belo Horizonte, MG", distanceKm: 434 },
        { origin: "Rio de Janeiro, RJ", destination: "Vitória, ES", distanceKm: 521 },
        { origin: "Belo Horizonte, MG", destination: "Vitória, ES", distanceKm: 524 },

        // Rotas São Paulo - outras regiões
        { origin: "São Paulo, SP", destination: "Brasília, DF", distanceKm: 1015 },
        { origin: "São Paulo, SP", destination: "Curitiba, PR", distanceKm: 408 },
        { origin: "São Paulo, SP", destination: "Florianópolis, SC", distanceKm: 705 },
        { origin: "São Paulo, SP", destination: "Porto Alegre, RS", distanceKm: 1125 },
        { origin: "São Paulo, SP", destination: "Salvador, BA", distanceKm: 1962 },
        { origin: "São Paulo, SP", destination: "Recife, PE", distanceKm: 2660 },
        { origin: "São Paulo, SP", destination: "Fortaleza, CE", distanceKm: 3125 },
        { origin: "São Paulo, SP", destination: "Belém, PA", distanceKm: 2933 },
        { origin: "São Paulo, SP", destination: "Manaus, AM", distanceKm: 3935 },

        // Rotas Rio de Janeiro - outras regiões
        { origin: "Rio de Janeiro, RJ", destination: "Brasília, DF", distanceKm: 1148 },
        { origin: "Rio de Janeiro, RJ", destination: "Salvador, BA", distanceKm: 1649 },
        { origin: "Rio de Janeiro, RJ", destination: "Curitiba, PR", distanceKm: 852 },
        { origin: "Rio de Janeiro, RJ", destination: "Porto Alegre, RS", distanceKm: 1553 },

        // Rotas Brasília - outras regiões
        { origin: "Brasília, DF", destination: "Goiânia, GO", distanceKm: 209 },
        { origin: "Brasília, DF", destination: "Salvador, BA", distanceKm: 1446 },
        { origin: "Brasília, DF", destination: "Belo Horizonte, MG", distanceKm: 716 },
        { origin: "Brasília, DF", destination: "Cuiabá, MT", distanceKm: 1133 },

        // Rotas Sul do Brasil
        { origin: "Curitiba, PR", destination: "Florianópolis, SC", distanceKm: 300 },
        { origin: "Curitiba, PR", destination: "Porto Alegre, RS", distanceKm: 711 },
        { origin: "Florianópolis, SC", destination: "Porto Alegre, RS", distanceKm: 476 },

        // Rotas Nordeste
        { origin: "Salvador, BA", destination: "Recife, PE", distanceKm: 839 },
        { origin: "Salvador, BA", destination: "Fortaleza, CE", distanceKm: 1389 },
        { origin: "Recife, PE", destination: "Fortaleza, CE", distanceKm: 800 },
        { origin: "Recife, PE", destination: "Natal, RN", distanceKm: 297 },
        { origin: "Fortaleza, CE", destination: "Natal, RN", distanceKm: 537 },
        { origin: "Salvador, BA", destination: "Aracaju, SE", distanceKm: 356 },

        // Rotas Norte
        { origin: "Belém, PA", destination: "Manaus, AM", distanceKm: 1294 },
        { origin: "Belém, PA", destination: "São Luís, MA", distanceKm: 806 },
        { origin: "Manaus, AM", destination: "Porto Velho, RO", distanceKm: 901 },

        // Rotas regionais importantes - Interior SP
        { origin: "São Paulo, SP", destination: "Campinas, SP", distanceKm: 95 },
        { origin: "São Paulo, SP", destination: "Santos, SP", distanceKm: 72 },
        { origin: "São Paulo, SP", destination: "Ribeirão Preto, SP", distanceKm: 313 },
        { origin: "Campinas, SP", destination: "Ribeirão Preto, SP", distanceKm: 228 },

        // Rotas regionais - RJ
        { origin: "Rio de Janeiro, RJ", destination: "Niterói, RJ", distanceKm: 13 },
        { origin: "Rio de Janeiro, RJ", destination: "Petrópolis, RJ", distanceKm: 68 },
    ],

    /**
     * Retorna array único e ordenado de todas as cidades disponíveis
     * @returns {string[]} Array de nomes de cidades
     */
    getAllCities: function() {
        const cities = new Set();
        
        // Extrair cidades de origem e destino
        this.routes.forEach(route => {
            cities.add(route.origin);
            cities.add(route.destination);
        });
        
        // Converter para array e ordenar alfabeticamente
        return Array.from(cities).sort();
    },

    /**
     * Busca a distância entre duas cidades
     * @param {string} origin - Cidade de origem
     * @param {string} destination - Cidade de destino
     * @returns {number|null} Distância em km ou null se não encontrado
     */
    findDistance: function(origin, destination) {
        // Normalizar entrada: remover espaços extras e converter para minúsculas
        const normalizedOrigin = origin.trim().toLowerCase();
        const normalizedDestination = destination.trim().toLowerCase();
        
        // Buscar rota em ambas as direções
        const route = this.routes.find(r => {
            const routeOrigin = r.origin.toLowerCase();
            const routeDestination = r.destination.toLowerCase();
            
            return (
                (routeOrigin === normalizedOrigin && routeDestination === normalizedDestination) ||
                (routeOrigin === normalizedDestination && routeDestination === normalizedOrigin)
            );
        });
        
        // Retornar distância se encontrado, null caso contrário
        return route ? route.distanceKm : null;
    }
};
