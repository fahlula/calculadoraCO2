/**
 * Aplicação Principal - Calculadora de Emissão de CO2
 * Gerencia inicialização e eventos do formulário
 */

// Aguardar carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    /**
     * INICIALIZAÇÃO DA APLICAÇÃO
     */
    
    // Preencher datalist com cidades disponíveis
    CONFIG.populateDatalist();
    
    // Configurar preenchimento automático de distância
    CONFIG.setupDistanceAutofill();
    
    // Obter elemento do formulário
    const form = document.getElementById('calculator-form');
    
    if (!form) {
        console.error('❌ Formulário não encontrado');
        return;
    }
    
    // Log de inicialização bem-sucedida
    console.log('🟢 Calculadora inicializada!');
    
    /**
     * MANIPULADOR DE ENVIO DO FORMULÁRIO
     */
    form.addEventListener('submit', function(event) {
        // Prevenir comportamento padrão de envio
        event.preventDefault();
        
        /**
         * COLETA DE DADOS DO FORMULÁRIO
         */
        
        // Obter valores dos inputs
        const origin = document.getElementById('origin').value.trim();
        const destination = document.getElementById('destination').value.trim();
        const distanceValue = document.getElementById('distance').value;
        const distance = parseFloat(distanceValue);
        
        // Obter modo de transporte selecionado
        const transportRadio = document.querySelector('input[name="transport"]:checked');
        const transportMode = transportRadio ? transportRadio.value : null;
        
        /**
         * VALIDAÇÃO DE INPUTS
         */
        
        // Verificar se todos os campos estão preenchidos
        if (!origin || !destination) {
            alert('⚠️ Por favor, preencha origem e destino.');
            return;
        }
        
        if (!distanceValue || isNaN(distance) || distance <= 0) {
            alert('⚠️ Por favor, insira uma distância válida maior que zero.');
            return;
        }
        
        if (!transportMode) {
            alert('⚠️ Por favor, selecione um modo de transporte.');
            return;
        }
        
        /**
         * INÍCIO DO PROCESSAMENTO
         */
        
        // Obter botão de submit
        const submitButton = form.querySelector('.calculator-form__submit');
        
        // Mostrar estado de carregamento
        UI.showLoading(submitButton);
        
        // Ocultar seções de resultados anteriores
        UI.hideElement('results');
        UI.hideElement('comparison');
        UI.hideElement('carbon-credits');
        
        /**
         * SIMULAÇÃO DE PROCESSAMENTO (1.5 segundos)
         */
        setTimeout(function() {
            try {
                /**
                 * CÁLCULOS DE EMISSÕES
                 */
                
                // Calcular emissão para o modo selecionado
                const emission = Calculator.calculateEmission(distance, transportMode);
                
                // Calcular emissão de carro como baseline
                const carEmission = Calculator.calculateEmission(distance, 'car');
                
                // Calcular economia comparada ao carro
                const savings = Calculator.calculateSavings(emission, carEmission);
                
                // Calcular comparação entre todos os modos
                const allModesComparison = Calculator.calculateAllModes(distance);
                
                // Calcular créditos de carbono necessários
                const emissionInTons = emission / CONFIG.CARBON_CREDIT.KG_PER_CREDIT;
                const creditPrice = Calculator.estimateCreditPrice(emissionInTons);
                
                /**
                 * PREPARAÇÃO DE DADOS PARA RENDERIZAÇÃO
                 */
                
                // Dados dos resultados principais
                const resultsData = {
                    origin: origin,
                    destination: destination,
                    distance: distance,
                    emission: emission,
                    mode: transportMode,
                    savings: savings
                };
                
                // Dados dos créditos de carbono
                const creditsData = {
                    credits: emissionInTons,
                    price: creditPrice
                };
                
                /**
                 * RENDERIZAÇÃO DOS RESULTADOS
                 */
                
                // Renderizar resultados principais
                const resultsHTML = UI.renderResults(resultsData);
                document.getElementById('results-content').innerHTML = resultsHTML;
                
                // Renderizar comparação entre modos
                const comparisonHTML = UI.renderComparison(allModesComparison, transportMode);
                document.getElementById('comparison-content').innerHTML = comparisonHTML;
                
                // Renderizar créditos de carbono
                const creditsHTML = UI.renderCarbonCredits(creditsData);
                document.getElementById('carbon-credits-content').innerHTML = creditsHTML;
                
                /**
                 * EXIBIÇÃO DOS RESULTADOS
                 */
                
                // Mostrar todas as seções de resultados
                UI.showElement('results');
                UI.showElement('comparison');
                UI.showElement('carbon-credits');
                
                // Rolar até a seção de resultados
                setTimeout(function() {
                    UI.scrollToElement('results');
                }, 100);
                
                // Remover estado de carregamento
                UI.hideLoading(submitButton);
                
                // Log de sucesso
                console.log('✅ Cálculo concluído com sucesso!', {
                    emission: emission,
                    mode: transportMode,
                    distance: distance
                });
                
            } catch (error) {
                /**
                 * TRATAMENTO DE ERROS
                 */
                
                // Log do erro no console
                console.error('❌ Erro ao calcular emissões:', error);
                
                // Mostrar mensagem amigável ao usuário
                alert('⚠️ Ocorreu um erro ao calcular as emissões. Por favor, tente novamente.');
                
                // Remover estado de carregamento
                UI.hideLoading(submitButton);
            }
        }, 1500); // Delay de 1.5 segundos para simular processamento
    });
});
