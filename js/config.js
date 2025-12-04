/**
 * Configurações globais da calculadora de CO2
 * Contém fatores de emissão, dados dos meios de transporte e métodos auxiliares
 */
const CONFIG = {
    /**
     * Fatores de emissão de CO2 por meio de transporte (kg CO2/km)
     */
    EMISSION_FACTORS: {
        bicycle: 0,
        car: 0.12,
        bus: 0.089,
        truck: 0.96
    },

    /**
     * Metadados dos meios de transporte
     */
    TRANSPORT_MODES: {
        bicycle: {
            label: 'Bicicleta',
            icon: '🚴',
            color: '#10b981'
        },
        car: {
            label: 'Carro',
            icon: '🚗',
            color: '#3b82f6'
        },
        bus: {
            label: 'Ônibus',
            icon: '🚌',
            color: '#f59e0b'
        },
        truck: {
            label: 'Caminhão',
            icon: '🚚',
            color: '#ef4444'
        }
    },

    /**
     * Configurações de créditos de carbono
     */
    CARBON_CREDIT: {
        KG_PER_CREDIT: 1000,
        PRICE_MIN_BRL: 50,
        PRICE_MAX_BRL: 150
    },

    /**
     * Popula o datalist com as cidades disponíveis
     */
    populateDatalist: function() {
        // Obter lista de cidades do banco de dados
        const cities = RoutesDB.getAllCities();
        
        // Obter elemento datalist
        const datalist = document.getElementById('cities-list');
        
        if (!datalist) {
            console.error('Datalist "cities-list" não encontrado');
            return;
        }
        
        // Limpar datalist existente
        datalist.innerHTML = '';
        
        // Criar e adicionar options para cada cidade
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            datalist.appendChild(option);
        });
    },

    /**
     * Configura o preenchimento automático da distância
     */
    setupDistanceAutofill: function() {
        // Obter elementos do formulário
        const originInput = document.getElementById('origin');
        const destinationInput = document.getElementById('destination');
        const distanceInput = document.getElementById('distance');
        const manualCheckbox = document.getElementById('manual-distance');
        const helperText = document.querySelector('.calculator-form__helper');

        if (!originInput || !destinationInput || !distanceInput || !manualCheckbox) {
            console.error('Elementos do formulário não encontrados');
            return;
        }

        /**
         * Função para buscar e preencher distância
         */
        const updateDistance = function() {
            // Obter valores dos inputs
            const origin = originInput.value.trim();
            const destination = destinationInput.value.trim();

            // Verificar se ambos estão preenchidos
            if (origin && destination) {
                // Buscar distância no banco de dados
                const distance = RoutesDB.findDistance(origin, destination);

                if (distance !== null) {
                    // Distância encontrada
                    distanceInput.value = distance;
                    distanceInput.readOnly = true;
                    
                    // Atualizar mensagem de ajuda com cor verde
                    if (helperText) {
                        helperText.textContent = `✓ Distância encontrada: ${distance} km`;
                        helperText.style.color = '#10b981';
                    }
                } else {
                    // Distância não encontrada
                    distanceInput.value = '';
                    distanceInput.readOnly = false;
                    
                    // Sugerir entrada manual
                    if (helperText) {
                        helperText.textContent = 'Rota não encontrada. Por favor, insira a distância manualmente.';
                        helperText.style.color = '#f59e0b';
                    }
                }
            } else {
                // Limpar se algum campo estiver vazio
                if (!manualCheckbox.checked) {
                    distanceInput.value = '';
                    
                    if (helperText) {
                        helperText.textContent = 'A distância será preenchida automaticamente';
                        helperText.style.color = '#6b7280';
                    }
                }
            }
        };

        // Adicionar listeners aos inputs de origem e destino
        originInput.addEventListener('change', updateDistance);
        destinationInput.addEventListener('change', updateDistance);

        // Listener para checkbox de entrada manual
        manualCheckbox.addEventListener('change', function() {
            if (this.checked) {
                // Modo manual ativado
                distanceInput.readOnly = false;
                distanceInput.focus();
                
                if (helperText) {
                    helperText.textContent = 'Insira a distância em quilômetros';
                    helperText.style.color = '#3b82f6';
                }
            } else {
                // Modo automático ativado
                distanceInput.readOnly = true;
                updateDistance();
            }
        });
    }
};
