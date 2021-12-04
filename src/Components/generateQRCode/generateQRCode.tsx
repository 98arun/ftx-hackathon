import React from "react";
import { QRCode } from "react-qr-svg";
import { Route, Routes } from "react-router-dom";

const styles: any = {
  root: {
    fontFamily: "sans-serif",
  },
  h1: {
    textAlign: "center",
  },
  qrcode: {
    textAlign: "center",
  },
};

export default class GenerateQRCode extends React.Component {
  state = {
    merchantId: "",
    amount: 0,
    invoiceId: "",
  };

  _handleInputChange = (e: any) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  _renderQRCodeGeneratorView = () => {
    const { merchantId, amount, invoiceId } = this.state;
    if (!merchantId) {
      return null;
    }
    return (
      <QRCode
        level="Q"
        style={{ width: 256 }}
        value={JSON.stringify({
          merchantId,
          amount,
          invoiceId,
        })}
      />
    );
  };

  render() {
    const { merchantId, amount, invoiceId } = this.state;
    return (
      <div style={styles.root}>
        <h1 style={styles.h1}>QRCode with JSON</h1>
        <div style={styles.qrcode}>
          <div>
            <input
              type="text"
              name="merchantId"
              onChange={this._handleInputChange}
              placeholder="Enter Merchant Id"
            />
            <input
              type="text"
              name="amount"
              onChange={this._handleInputChange}
              placeholder="Enter Amount (Optional)"
            />
            <input
              type="text"
              name="invoiceId"
              onChange={this._handleInputChange}
              placeholder="Enter Invoice Id (Optional)"
            />
          </div>
          <div style={{ marginTop: "40px" }}>
            {this._renderQRCodeGeneratorView()}
          </div>
        </div>
        <Routes>
          <Route path="/GenerateQRCode" element={<GenerateQRCode />} />
        </Routes>
      </div>
    );
  }
}
