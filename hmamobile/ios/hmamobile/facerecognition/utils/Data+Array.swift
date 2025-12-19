//
//  Data+Array.swift
//  hmamobile
//
//  Created for Face Recognition module
//

import Foundation

extension Data {

    /// Convert Data to Float array
    func toArray<T>(type: T.Type) -> [T] {
        let elementSize = MemoryLayout<T>.stride
        let count = self.count / elementSize

        return self.withUnsafeBytes { bufferPointer in
            let pointer = bufferPointer.baseAddress!.assumingMemoryBound(to: T.self)
            return Array(UnsafeBufferPointer(start: pointer, count: count))
        }
    }

    /// Convert Float array to Data
    static func fromArray<T>(_ array: [T]) -> Data {
        return array.withUnsafeBufferPointer { buffer in
            Data(buffer: buffer)
        }
    }
}
