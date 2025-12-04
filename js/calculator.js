/**
 * Módulo de cálculos de emissões de CO2
 * Contém métodos para calcular emissões, comparações e créditos de carbono
 */
const Calculator = {
    /**
     * Calcula a emissão de CO2 para uma distância e meio de transporte
     * @param {number} distanceKm - Distância em quilômetros
     * @param {string} transportMode - Modo de transporte (bicycle, car, bus, truck)
     * @returns {number} Emissão em kg de CO2 (arredondado para 2 casas decimais)
     */
    calculateEmission: function(distanceKm, transportMode) {
        // Obter fator de emissão do CONFIG
        const emissionFactor = CONFIG.EMISSION_FACTORS[transportMode];
        
        if (emissionFactor === undefined) {
            console.error(`Modo de transporte inválido: ${transportMode}`);
            return 0;
        }
        
        // Calcular emissão: distância * fator de emissão
        const emission = distanceKm * emissionFactor;
        
        // Retornar resultado arredondado para 2 casas decimais
        return Math.round(emission * 100) / 100;
    },

    /**
     * Calcula emissões para todos os meios de transporte
     * @param {number} distanceKm - Distância em quilômetros
     * @returns {Array} Array de objetos com emissões e comparações
     */
    calculateAllModes: function(distanceKm) {
        // Array para armazenar resultados
        const results = [];
        
        // Calcular emissão de carro como baseline para comparação
        const carEmission = this.calculateEmission(distanceKm, 'car');
        
        // Iterar sobre todos os modos de transporte
        for (const mode in CONFIG.EMISSION_FACTORS) {
            // Calcular emissão para este modo
            const emission = this.calculateEmission(distanceKm, mode);
            
            // Calcular percentual em relação ao carro
            // Se carro emite 0, usar 100% para evitar divisão por zero
            let percentageVsCar = 100;
            if (carEmission > 0) {
                percentageVsCar = Math.round((emission / carEmission) * 100 * 100) / 100;
            } else if (emission === 0) {
                percentageVsCar = 0;
            }
            
            // Adicionar resultado ao array
            results.push({
                mode: mode,
                emission: emission,
                percentageVsCar: percentageVsCar
            });
        }
        
        // Ordenar por emissão (menor para maior)
        results.sort((a, b) => a.emission - b.emission);
        
        return results;
    },

    /**
     * Calcula economia de emissões comparada com baseline
     * @param {number} emission - Emissão do modo escolhido (kg CO2)
     * @param {number} baselineEmission - Emissão baseline para comparação (kg CO2)
     * @returns {Object} Objeto com kg economizados e percentual
     */
    calculateSavings: function(emission, baselineEmission) {
        // Calcular kg economizados
        const savedKg = baselineEmission - emission;
        
        // Calcular percentual de economia
        let percentage = 0;
        if (baselineEmission > 0) {
            percentage = (savedKg / baselineEmission) * 100;
        }
        
        // Retornar valores arredondados para 2 casas decimais
        return {
            savedKg: Math.round(savedKg * 100) / 100,
            percentage: Math.round(percentage * 100) / 100
        };
    },

    /**
     * Estima preço de créditos de carbono
     * @param {number} credits - Número de créditos de carbono
     * @returns {Object} Objeto com preços mínimo, máximo e médio em BRL
     */
    estimateCreditPrice: function(credits) {
        // Obter valores de preço do CONFIG
        const priceMin = CONFIG.CARBON_CREDIT.PRICE_MIN_BRL;
        const priceMax = CONFIG.CARBON_CREDIT.PRICE_MAX_BRL;
        
        // Calcular preço mínimo total
        const min = credits * priceMin;
        
        // Calcular preço máximo total
        const max = credits * priceMax;
        
        // Calcular preço médio
        const average = (min + max) / 2;
        
        // Retornar valores arredondados para 2 casas decimais
        return {
            min: Math.round(min * 100) / 100,
            max: Math.round(max * 100) / 100,
            average: Math.round(average * 100) / 100
        };
    }
};
