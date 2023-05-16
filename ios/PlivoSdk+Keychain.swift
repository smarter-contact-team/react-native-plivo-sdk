//
//  PlivoSdk+Keychain.swift
//  react-native-plivo-sdk
//
//  Created by Ainur on 11.05.2023.
//

import Foundation

extension PlivoSdk {
    enum Constants {
        static let usernameKey = "com.plivo.username"
        static let passwordKey = "com.plivo.password"
        static let deviceTokenKey = "com.plivo.deviceToken"
        static let certificateIdKey = "com.plivo.certificateId"
    }

    func saveCredentials(_ username: String,
                         _ password: String,
                         _ deviceToken: String,
                         _ certificateId: String) {
        addItemToKeychain(service: Constants.usernameKey, value: username)
        addItemToKeychain(service: Constants.passwordKey, value: password)
        addItemToKeychain(service: Constants.deviceTokenKey, value: deviceToken)
        addItemToKeychain(service: Constants.certificateIdKey, value: certificateId)
    }

    func deleteCredentials() {
        deleteItemFromKeychain(service: Constants.usernameKey)
        deleteItemFromKeychain(service: Constants.passwordKey)
        deleteItemFromKeychain(service: Constants.deviceTokenKey)
        deleteItemFromKeychain(service: Constants.certificateIdKey)
    }

    @discardableResult
    private func addItemToKeychain(service: String, value: String) -> Bool {
        let account = "plivo"
        var keychainQuery: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service,
            kSecAttrAccount as String: account
        ]

        let dataToSave = value.data(using: .utf8)!
        keychainQuery[kSecValueData as String] = dataToSave

        let status = SecItemAdd(keychainQuery as CFDictionary, nil)
        return status == errSecSuccess
    }

    @discardableResult
    func deleteItemFromKeychain(service: String) -> Bool {
        let query: [String: Any] = [
            kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service
        ]

        let status = SecItemDelete(query as CFDictionary)
        return status == errSecSuccess
    }
}
