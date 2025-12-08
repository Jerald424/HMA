
// android/app/src/main/java/com/facecompare/FaceComparePackage.kt
package com.hmamobile

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.NativeModule
import com.facebook.react.ReactPackage
import com.facebook.react.uimanager.ViewManager

class FaceComparePackage : ReactPackage {
    override fun createNativeModules(rc: ReactApplicationContext): List<NativeModule> =
        listOf(FaceCompareModule(rc))

    override fun createViewManagers(rc: ReactApplicationContext): List<ViewManager<*, *>> =
        emptyList()
}