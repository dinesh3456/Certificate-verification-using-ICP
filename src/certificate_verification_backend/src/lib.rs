use candid::{CandidType, Deserialize};
use ic_cdk_macros::*;
use std::cell::RefCell;
use std::collections::HashMap;

#[derive(CandidType, Deserialize, Clone)]
struct Certificate {
    id: String,
    student_name: String,
    course_name: String,
    issue_date: String,
    issuer: String,
}

thread_local! {
    static CERTIFICATES: RefCell<HashMap<String, Certificate>> = RefCell::new(HashMap::new());
}

#[init]
fn init() {
    ic_cdk::println!("Canister initialized");
}

#[update]
fn issue_certificate(certificate: Certificate) -> String {
    let id = ic_cdk::api::time().to_string();
    let mut new_certificate = certificate;
    new_certificate.id = id.clone();

    CERTIFICATES.with(|certificates| {
        certificates.borrow_mut().insert(id.clone(), new_certificate);
    });

    id
}

#[query]
fn verify_certificate(id: String) -> Option<Certificate> {
    CERTIFICATES.with(|certificates| {
        certificates.borrow().get(&id).cloned()
    })
}

#[query]
fn get_all_certificates() -> Vec<Certificate> {
    CERTIFICATES.with(|certificates| {
        certificates.borrow().values().cloned().collect()
    })
}