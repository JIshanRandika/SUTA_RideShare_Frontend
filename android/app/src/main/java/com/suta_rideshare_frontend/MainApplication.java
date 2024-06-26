
package com.suta_rideshare_frontend;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.reactnativecommunity.geolocation.GeolocationPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.config.ReactFeatureFlags;
import com.facebook.soloader.SoLoader;
import com.suta_rideshare_frontend.newarchitecture.MainApplicationReactNativeHost;
import java.lang.reflect.InvocationTargetException;
import java.util.List;

import com.swmansion.rnscreens.RNScreensPackage;

import com.swmansion.gesturehandler.RNGestureHandlerPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import com.swmansion.reanimated.ReanimatedPackage;

import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;
//import com.reactcommunity.rngeolocation.RNGeolocationPackage;

import androidx.multidex.MultiDex;
import com.facebook.react.shell.MainReactPackage;

import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import java.util.Arrays;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.react.ReactPackage;

import com.airbnb.android.react.maps.MapsPackage;

import com.oblador.vectoricons.VectorIconsPackage;

import com.reactnativegooglesignin.RNGoogleSigninPackage;

import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
import io.invertase.firebase.auth.ReactNativeFirebaseAuthPackage;

public class MainApplication extends Application implements ReactApplication {
    @Override
     protected void attachBaseContext(Context base) {
                  super.attachBaseContext(base);
                  MultiDex.install(this);
              }
  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
//                    List<ReactPackage> packages = new PackageList(this).getPackages(),
                    new MainReactPackage(),
            new ReactNativePushNotificationPackage(),
            new GeolocationPackage(),
                    new MapsPackage(),
                    new AsyncStoragePackage(),
//                    new ReanimatedPackage(),
//                    new RNGestureHandlerPackage(),
                    new RNScreensPackage(),
                    new ReanimatedPackage(),
                    new RNGestureHandlerPackage(),
                    new SafeAreaContextPackage(),
                    new RNDateTimePickerPackage(),
                    new VectorIconsPackage(),
                    new RNGoogleSigninPackage(),
                    new ReactNativeFirebaseAppPackage(),
                    new ReactNativeFirebaseAuthPackage()

//                    new RNGoogleSigninPackage()
//                    new RNGeolocationPackage()
//                    new RNCSafeAreaProviderPackage()
//                    new SafeAreaContextPackage()
            );
        }

//        protected List<ReactPackage> getPackages() {
//          @SuppressWarnings("UnnecessaryLocalVariable")
//          List<ReactPackage> packages = new PackageList(this).getPackages();
//          // Packages that cannot be autolinked yet can be added manually here, for example:
////           packages.add(new MyReactNativePackage());
//           packages.add(new MainReactPackage());
//           packages.add(new MapsPackage());
//          return packages;
//        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }
      };

  private final ReactNativeHost mNewArchitectureNativeHost =
      new MainApplicationReactNativeHost(this);

  @Override
  public ReactNativeHost getReactNativeHost() {
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      return mNewArchitectureNativeHost;
    } else {
      return mReactNativeHost;
    }
  }

  @Override
  public void onCreate() {
    super.onCreate();
    // If you opted-in for the New Architecture, we enable the TurboModule system
    ReactFeatureFlags.useTurboModules = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.suta_rideshare_frontend.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}
