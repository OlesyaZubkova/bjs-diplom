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
        if (response.success === true) {
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
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Счет пополнен');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
};

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Конвертирование валюты прошло успешно');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
};

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if (response.success === true) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Перевод выполнен успешно');
        } else {
            moneyManager.setMessage(response.success, response.error);
        }            
    });
};

const favoriteWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success === true) {
        favoriteWidget.clearTable();
        favoriteWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoriteWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success === true) {
            favoriteWidget.setMessage(response.success, 'Пользователь добавлен в избранное');
        } else {
            favoriteWidget.setMessage(response.success, response.error);
        }     
    });
};

favoriteWidget.removeUserCallback  = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
            if (response.success === true) {
                favoriteWidget.setMessage(response.success, 'Пользователь удален из избранного');
            } else {
                favoriteWidget.setMessage(response.success, response.error);           
        }
    });
};