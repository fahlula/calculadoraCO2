/**
 * Módulo de Interface do Usuário
 * Contém métodos para formatação, exibição e renderização de resultados
 */
const UI = {
    /**
     * MÉTODOS UTILITÁRIOS
     */

    /**
     * Formata número com casas decimais e separadores
     * @param {number} number - Número a ser formatado
     * @param {number} decimals - Número de casas decimais
     * @returns {string} Número formatado
     */
    formatNumber: function(number, decimals = 2) {
        return number.toLocaleString('pt-BR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    },

    /**
     * Formata valor monetário em Real brasileiro
     * @param {number} value - Valor a ser formatado
     * @returns {string} Valor formatado como "R$ 1.234,56"
     */
    formatCurrency: function(value) {
        return value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    },

    /**
     * Exibe elemento removendo classe hidden
     * @param {string} elementId - ID do elemento
     */
    showElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.remove('hidden');
        }
    },

    /**
     * Oculta elemento adicionando classe hidden
     * @param {string} elementId - ID do elemento
     */
    hideElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.classList.add('hidden');
        }
    },

    /**
     * Rola página até elemento específico
     * @param {string} elementId - ID do elemento
     */
    scrollToElement: function(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    /**
     * MÉTODOS DE RENDERIZAÇÃO
     */

    /**
     * Renderiza resultados principais da calculadora
     * @param {Object} data - Dados do cálculo
     * @returns {string} HTML formatado
     */
    renderResults: function(data) {
        const { origin, destination, distance, emission, mode, savings } = data;
        
        // Obter metadados do modo de transporte
        const modeData = CONFIG.TRANSPORT_MODES[mode];
        
        let html = '<h2 class="section-title">📊 Resultado da Viagem</h2>';
        
        // Card de Rota
        html += `
            <div class="results__card">
                <div class="results__card-icon">🗺️</div>
                <div class="results__card-content">
                    <h3 class="results__card-title">Rota</h3>
                    <p class="results__card-value">${origin} → ${destination}</p>
                </div>
            </div>
        `;
        
        // Card de Distância
        html += `
            <div class="results__card">
                <div class="results__card-icon">📏</div>
                <div class="results__card-content">
                    <h3 class="results__card-title">Distância</h3>
                    <p class="results__card-value">${this.formatNumber(distance, 0)} km</p>
                </div>
            </div>
        `;
        
        // Card de Emissão
        html += `
            <div class="results__card results__card--highlight">
                <div class="results__card-icon">🍃</div>
                <div class="results__card-content">
                    <h3 class="results__card-title">Emissão de CO₂</h3>
                    <p class="results__card-value">${this.formatNumber(emission)} kg</p>
                    <p class="results__card-subtitle">de dióxido de carbono</p>
                </div>
            </div>
        `;
        
        // Card de Modo de Transporte
        html += `
            <div class="results__card">
                <div class="results__card-icon">${modeData.icon}</div>
                <div class="results__card-content">
                    <h3 class="results__card-title">Meio de Transporte</h3>
                    <p class="results__card-value">${modeData.label}</p>
                </div>
            </div>
        `;
        
        // Card de Economia (se não for carro e houver economia)
        if (mode !== 'car' && savings && savings.savedKg > 0) {
            html += `
                <div class="results__card results__card--success">
                    <div class="results__card-icon">✅</div>
                    <div class="results__card-content">
                        <h3 class="results__card-title">Economia vs Carro</h3>
                        <p class="results__card-value">${this.formatNumber(savings.savedKg)} kg</p>
                        <p class="results__card-subtitle">${this.formatNumber(savings.percentage)}% menos CO₂</p>
                    </div>
                </div>
            `;
        }
        
        return html;
    },

    /**
     * Renderiza comparação entre modos de transporte
     * @param {Array} modesArray - Array de objetos com dados de cada modo
     * @param {string} selectedMode - Modo selecionado pelo usuário
     * @returns {string} HTML formatado
     */
    renderComparison: function(modesArray, selectedMode) {
        let html = '<h2 class="section-title">🔄 Comparação entre Transportes</h2>';
        html += '<div class="comparison__grid">';
        
        // Encontrar emissão máxima para calcular barras de progresso
        const maxEmission = Math.max(...modesArray.map(m => m.emission));
        
        modesArray.forEach(modeItem => {
            const modeData = CONFIG.TRANSPORT_MODES[modeItem.mode];
            const isSelected = modeItem.mode === selectedMode;
            
            // Calcular largura da barra (percentual da emissão máxima)
            const barWidth = maxEmission > 0 ? (modeItem.emission / maxEmission) * 100 : 0;
            
            // Determinar cor da barra baseada no percentual vs carro
            let barColor = '#10b981'; // verde
            if (modeItem.percentageVsCar > 100) {
                barColor = '#ef4444'; // vermelho
            } else if (modeItem.percentageVsCar > 75) {
                barColor = '#f59e0b'; // laranja
            } else if (modeItem.percentageVsCar > 25) {
                barColor = '#fbbf24'; // amarelo
            }
            
            html += `
                <div class="comparison__item ${isSelected ? 'comparison__item--selected' : ''}">
                    <div class="comparison__header">
                        <span class="comparison__icon">${modeData.icon}</span>
                        <div class="comparison__info">
                            <h3 class="comparison__title">${modeData.label}</h3>
                            ${isSelected ? '<span class="comparison__badge">Selecionado</span>' : ''}
                        </div>
                    </div>
                    <div class="comparison__stats">
                        <div class="comparison__stat">
                            <span class="comparison__stat-label">Emissão:</span>
                            <span class="comparison__stat-value">${this.formatNumber(modeItem.emission)} kg CO₂</span>
                        </div>
                        <div class="comparison__stat">
                            <span class="comparison__stat-label">vs Carro:</span>
                            <span class="comparison__stat-value">${this.formatNumber(modeItem.percentageVsCar)}%</span>
                        </div>
                    </div>
                    <div class="comparison__bar">
                        <div class="comparison__bar-fill" 
                             style="width: ${barWidth}%; background-color: ${barColor};">
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        
        // Adicionar dica útil
        html += `
            <div class="comparison__tip">
                <strong>💡 Dica:</strong> 
                Optar por transportes coletivos ou não motorizados pode reduzir significativamente 
                sua pegada de carbono. Cada pequena escolha faz diferença!
            </div>
        `;
        
        return html;
    },

    /**
     * Renderiza informações sobre créditos de carbono
     * @param {Object} creditsData - Dados dos créditos
     * @returns {string} HTML formatado
     */
    renderCarbonCredits: function(creditsData) {
        const { credits, price } = creditsData;
        
        let html = '<h2 class="section-title">💳 Créditos de Carbono</h2>';
        html += '<div class="carbon-credits__grid">';
        
        // Card 1: Créditos necessários
        html += `
            <div class="carbon-credits__card">
                <div class="carbon-credits__card-icon">🌳</div>
                <h3 class="carbon-credits__card-title">Créditos Necessários</h3>
                <p class="carbon-credits__card-value">${this.formatNumber(credits, 3)}</p>
                <p class="carbon-credits__card-helper">*1 crédito = 1.000 kg CO₂</p>
            </div>
        `;
        
        // Card 2: Preço estimado
        html += `
            <div class="carbon-credits__card">
                <div class="carbon-credits__card-icon">💰</div>
                <h3 class="carbon-credits__card-title">Valor Estimado</h3>
                <p class="carbon-credits__card-value">${this.formatCurrency(price.average)}</p>
                <p class="carbon-credits__card-helper">
                    Faixa: ${this.formatCurrency(price.min)} - ${this.formatCurrency(price.max)}
                </p>
            </div>
        `;
        
        html += '</div>';
        
        // Caixa informativa
        html += `
            <div class="carbon-credits__info">
                <h4>ℹ️ O que são Créditos de Carbono?</h4>
                <p>
                    Créditos de carbono são certificados que representam a redução de 
                    uma tonelada de CO₂ na atmosfera. Ao compensar suas emissões, você 
                    apoia projetos de preservação ambiental, reflorestamento e energia renovável.
                </p>
            </div>
        `;
        
        // Botão de ação (demonstrativo)
        html += `
            <button class="carbon-credits__action" onclick="alert('Funcionalidade em desenvolvimento!')">
                🌱 Compensar Emissões
            </button>
        `;
        
        return html;
    },

    /**
     * Exibe estado de carregamento no botão
     * @param {HTMLElement} buttonElement - Elemento do botão
     */
    showLoading: function(buttonElement) {
        // Salvar texto original
        buttonElement.dataset.originalText = buttonElement.innerHTML;
        
        // Desabilitar botão
        buttonElement.disabled = true;
        
        // Mostrar spinner
        buttonElement.innerHTML = '<span class="spinner"></span> Calculando...';
    },

    /**
     * Remove estado de carregamento do botão
     * @param {HTMLElement} buttonElement - Elemento do botão
     */
    hideLoading: function(buttonElement) {
        // Habilitar botão
        buttonElement.disabled = false;
        
        // Restaurar texto original
        if (buttonElement.dataset.originalText) {
            buttonElement.innerHTML = buttonElement.dataset.originalText;
        }
    }
};
