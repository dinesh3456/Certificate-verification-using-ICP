import { Actor, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";
import { idlFactory as certificate_verification_backend_idl } from "dfx-generated/certificate_verification_backend/certificate_verification_backend.did.js";

const agent = new HttpAgent();
const canisterId = "bd3sg-teaaa-aaaaa-qaaba-cai"; // Make sure this ID is correct

const certificate_verification_backend = Actor.createActor(certificate_verification_backend_idl, { agent, canisterId });

export const issueCertificate = async (certificate) => {
  try {
    console.log('Issuing certificate:', certificate);
    const verificationId = await certificate_verification_backend.issue_certificate(certificate);
    console.log('Certificate issued successfully with Verification ID:', verificationId);
    return verificationId;
  } catch (error) {
    console.error('Error issuing certificate:', error);
    throw error;
  }
};

export const verifyCertificate = async (verificationId) => {
  try {
    console.log('Verifying certificate with Verification ID:', verificationId);
    const result = await certificate_verification_backend.verify_certificate(verificationId);
    console.log('Certificate verification result:', result);
    return result;
  } catch (error) {
    console.error('Error verifying certificate:', error);
    throw error;
  }
};

export const getAllCertificates = async () => {
  try {
    console.log('Getting all certificates');
    const certificates = await certificate_verification_backend.get_all_certificates();
    console.log('Retrieved certificates:', certificates);
    return certificates;
  } catch (error) {
    console.error('Error getting all certificates:', error);
    throw error;
  }
};