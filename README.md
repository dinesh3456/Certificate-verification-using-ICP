# Certificate Verification System

## Overview

The Certificate Verification System is a decentralized application (dApp) built on the Internet Computer platform. It allows educational institutions to issue digital certificates and enables anyone to verify the authenticity of these certificates. This system leverages blockchain technology to ensure the integrity and immutability of certificate records.

## Features

- **Certificate Issuance**: Educational institutions can issue digital certificates with unique identifiers.
- **Certificate Verification**: Anyone can verify the authenticity of a certificate using its unique identifier.
- **Decentralized Storage**: All certificate data is stored securely on the Internet Computer blockchain.
- **Tamper-proof Records**: Once issued, certificates cannot be altered, ensuring their integrity.
- **User-friendly Interface**: Easy-to-use web interface for both certificate issuance and verification.

## Technologies Used

- Frontend: React.js
- Backend: Rust (Canister Smart Contract)
- Blockchain: Internet Computer Protocol (ICP)
- Build Tool: Webpack
- Package Manager: npm

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) 
- [npm](https://www.npmjs.com/) 
- [dfx](https://internetcomputer.org/docs/current/developer-tools/dfx-intro) (Internet Computer SDK)
- [Rust](https://www.rust-lang.org/tools/install)

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/your-username/certificate-verification-system.git
   cd certificate-verification-system
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the local Internet Computer replica:
   ```
   dfx start --background
   ```

4. Deploy the canisters:
   ```
   dfx deploy
   ```

5. Build the frontend:
   ```
   npm run build
   ```

### Issuing a Certificate

1. Navigate to the "Issue Certificate" section.
2. Fill in the required details (student name, course name, issue date, etc.).
3. Click on "Issue Certificate" to create a new certificate.
4. Note down the unique identifier provided for the certificate.

### Verifying a Certificate

1. Go to the "Verify Certificate" section.
2. Enter the unique identifier of the certificate you wish to verify.
3. Click on "Verify" to check the authenticity of the certificate.


