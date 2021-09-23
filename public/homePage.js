'use strict';

const logout = new LogoutButton();
logout.action = () => {
    ApiConnector.logout(response => {
        if (response.success === true) {
            location.reload();
        }
    });
};

ApiConnector.current(response => {
    if (response.success === true) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();

function getRatesBoard () {
    ApiConnector.getStocks(response => {
        if (response === true) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}

const timer = setInterval(getRatesBoard, 60000);

getRatesBoard();

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        if (response === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Счет пополнен');
        } else {
            moneyManager.setMessage(response.error, 'Не удалось пополнить счет');
        }
    });
};

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Конвертирование валюты прошло успешно');
        } else {
            moneyManager.setMessage(response.error, 'Не удалось произвести конвертацию');
        }
    });
};

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if (response === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Перевод выполнен успешно');
        } else {
            moneyManager.setMessage(response.error, 'Не удалось выполнить перевод');
        }            
    });
};

