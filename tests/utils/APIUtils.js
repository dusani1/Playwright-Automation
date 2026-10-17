class APIUtils {

    constructor(apiContext, loginPayload) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }

    async getToke(loginPayload) {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            })

        //expect(loginResponse.ok()).toBeTruthy();
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        //console.log(token);
        return token;
    }

    async createOrder(orderPayload) {
        let response = {};
        response.token = await this.getToke(this.loginPayload);
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayload,
                headers: {
                    'authorization': response.token,
                    'content-type': 'application/json'
                }

            })

        const orderResponseJson = await orderResponse.json();
        const orderID = orderResponseJson.orders[0];
        console.log(orderID);
        response.orderID = orderID;
        return response;
    }


}

module.exports = {APIUtils};