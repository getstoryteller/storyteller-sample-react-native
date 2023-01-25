package com.storytellerreactnative;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;

import com.facebook.react.ReactActivity;
import com.storyteller.reactnative.StorytellerModule;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "StorytellerReactNative";
  }

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    View decorView = getWindow().getDecorView();
    decorView.setSystemUiVisibility(
            decorView.getSystemUiVisibility() | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
    );
  }

  @Override
  public void onActivityReenter(int resultCode, Intent data) {
    super.onActivityReenter(resultCode, data);
    StorytellerModule.Companion.activityReentered(this);
  }
}
