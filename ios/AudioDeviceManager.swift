//
//  AudioDeviceManager.swift
//  react-native-plivo-sdk
//
//  Created by Ainur on 30.05.2023.
//

import AVFoundation

protocol AudioDeviceManagerDelegate: AnyObject {
    func didChangeHeadphonesState(connected: Bool)
}

final class AudioDeviceManager {
    enum AudioDevice: Int {
        case phone
        case speaker
        case headphones
    }

    weak var delegate: AudioDeviceManagerDelegate?

    private let session = AVAudioSession.sharedInstance()

    init() {
        do {
            try session.setCategory(.playAndRecord, mode: .voiceChat)
            try session.setActive(true)
        } catch {
            print("Failed to set audio session category.")
        }

        NotificationCenter.default.addObserver(self,
                                               selector: #selector(handleRouteChange),
                                               name: AVAudioSession.routeChangeNotification,
                                               object: nil)
    }

    func isBluetoothDeviceConnected() {
        let isConnected = session.currentRoute.outputs.contains {$0.portType == .bluetoothHFP}
        delegate?.didChangeHeadphonesState(connected: isConnected)
    }

    func setAudioDevice(type: Int) {
        let audioDevice = AudioDevice(rawValue: type)
        do {
            switch audioDevice {
            case .speaker:
                try session.overrideOutputAudioPort(.speaker)
            case .phone:
                try session.setCategory(.playAndRecord, mode: .voiceChat, options: [])
                try session.overrideOutputAudioPort(.none)
            case .headphones:
                try session.setCategory(.playAndRecord, mode: .voiceChat, options: .allowBluetooth)
                try session.overrideOutputAudioPort(.none)
            default:
                break
            }
        } catch {
            print("Failed to switch device: \(error)")
        }
    }

    @objc private func handleRouteChange(notification: Notification) {
        guard let userInfo = notification.userInfo,
              let reasonValue = userInfo[AVAudioSessionRouteChangeReasonKey] as? UInt,
              let reason = AVAudioSession.RouteChangeReason(rawValue: reasonValue) else {
            return
        }

        switch reason {
        case .newDeviceAvailable:
            let session = AVAudioSession.sharedInstance()
            for output in session.currentRoute.outputs where output.portType == AVAudioSession.Port.bluetoothHFP {
                delegate?.didChangeHeadphonesState(connected: true)
            }
        case .oldDeviceUnavailable:
            if let previousRoute =
                userInfo[AVAudioSessionRouteChangePreviousRouteKey] as? AVAudioSessionRouteDescription {
                for output in previousRoute.outputs where output.portType == AVAudioSession.Port.bluetoothHFP {
                    delegate?.didChangeHeadphonesState(connected: false)
                }
            }
        default: break
        }
    }
}
