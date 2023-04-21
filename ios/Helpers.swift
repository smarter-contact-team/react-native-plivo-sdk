import Foundation

func convertHex(_ s: String.UnicodeScalarView, i: String.UnicodeScalarIndex, appendTo d: [UInt8]) -> [UInt8] {
    let skipChars = CharacterSet.whitespacesAndNewlines

    guard i != s.endIndex else { return d }

    let next1 = s.index(after: i)

    if skipChars.contains(s[i]) {
        return convertHex(s, i: next1, appendTo: d)
    } else {
        guard next1 != s.endIndex else { return d }
        let next2 = s.index(after: next1)

        let sub = String(s[i..<next2])

        guard let v = UInt8(sub, radix: 16) else { return d }

        return convertHex(s, i: next2, appendTo: d + [ v ])
    }
}
