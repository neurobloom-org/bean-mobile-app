package com.frontend

import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "Frontend"

  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return object : DefaultReactActivityDelegate(
      this,
      mainComponentName,
      false // Disable Fabric/New Architecture
    ) {}
  }
}