document.getElementById('startEthMining').addEventListener('click', function() {
    startMining('Ethereum');
});

document.getElementById('startEthMining').addEventListener('click', function() {
    getEthMiningStats();
});

function getEthMiningStats() {
    const ethStatsDiv = document.getElementById('ethMiningStats');
    ethStatsDiv.innerHTML = 'Fetching Ethereum mining stats...';

    fetch('https://api.ethermine.org/miner/0xc779cCB94762Ab8d7207ac1C7dDfDBB0978aA75A/dashboard')
        .then(response => response.json())
        .then(data => {
            const stats = data.data.statistics;
            const currentHashrate = stats.currentHashrate;
            const reportedHashrate = stats.reportedHashrate;
            const activeWorkers = stats.activeWorkers;
            const ethEarned = stats.unpaid / 1e18; // Convertendo de Wei para Ether

            ethStatsDiv.innerHTML = `
                <h3>Ethereum Mining Statistics</h3>
                <p>Current Hashrate: ${currentHashrate} MH/s</p>
                <p>Reported Hashrate: ${reportedHashrate} MH/s</p>
                <p>Active Workers: ${activeWorkers}</p>
                <p>Ether Earned: ${ethEarned.toFixed(5)} ETH</p>
            `;
        })
        .catch(error => {
            ethStatsDiv.innerHTML = 'Error fetching Ethereum mining stats.';
            console.error('Error fetching Ethereum mining stats:', error);
        });
}


document.getElementById('startLtcMining').addEventListener('click', function() {
    startMining('Litecoin');
});

document.getElementById('startLtcMining').addEventListener('click', function() {
    getLtcMiningStats();
});

function getLtcMiningStats() {
    const ltcStatsDiv = document.getElementById('ltcMiningStats');
    ltcStatsDiv.innerHTML = 'Fetching Litecoin mining stats...';

    fetch('https://www.litecoinpool.org/api?api_key=c370d81967bfe3ac88c4ea83a7b8a176&action=stats')
        .then(response => response.json())
        .then(data => {
            const stats = data.stats;
            const hashrate = stats.hashrate;
            const miners = stats.miners;
            const ltcEarned = stats.round_shares * stats.reward / 1e8; // Convertendo de Satoshis para Litecoin

            ltcStatsDiv.innerHTML = `
                <h3>Litecoin Mining Statistics</h3>
                <p>Hashrate: ${hashrate} MH/s</p>
                <p>Miners: ${miners}</p>
                <p>Litecoin Earned: ${ltcEarned.toFixed(5)} LTC</p>
            `;
        })
        .catch(error => {
            ltcStatsDiv.innerHTML = 'Error fetching Litecoin mining stats.';
            console.error('Error fetching Litecoin mining stats:', error);
        });
}


function startMining(crypto) {
    // Simulação de mineração
    const statsDiv = document.getElementById(`${crypto.toLowerCase()}MiningStats`);
    statsDiv.innerHTML = `${crypto} mining in progress...`;
    setTimeout(function() {
        statsDiv.innerHTML = `${crypto} mining completed!`;
    }, 3000); // Simula 3 segundos de mineração
}

