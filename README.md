# Automato SDK

Automato SDK is a comprehensive toolkit designed to simplify interactions with the Automato platform's API. It provides a range of functionalities, from authentication to managing contact properties, making it easier for developers to integrate Automato's features into their applications.

## Features

- User Authentication
- Contact Identification
- Upsert Contact Properties

## Installation

Install Automato SDK using npm:

```bash
npm install automato-sdk

Or using yarn:

yarn add automato-sdk
```

## Usage
Here's a quick example to get you started:

```bash
import AutomatoSDK from 'automato-sdk';

const sdk = new AutomatoSDK("MY_SECRET_KEY", "https://api.automato.pro");

// Using the identify function
const props = [
    { key: "email", value_type: "string", value: "example@email.com" }
];

sdk.identify(props)
   .then(token => console.log("Token:", token))
   .catch(error => console.error("Error:", error));
```

## API Reference

identify(props: Prop[], token?: string): Promise<string>
    Use identify to upsert contact required fields and get token. 

upsertContactProp(prop: Prop, token: string): Promise<void>
    Create or update contact props

## Contributing

Contributions are welcome! Please read our contributing guidelines to get started.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support
If you have any questions or issues, please open an issue on the [GitHub repository](https://github.com/mahd-dev/automato-sdk) or contact contact@mahd.dev.

## GitHub Repository

The source code for Automato SDK is available on GitHub. Visit our [GitHub repository](https://github.com/mahd-dev/automato-sdk) to access the code, report issues, or make contributions.

## Additional Information

    Official website :
    https://automato.pro/