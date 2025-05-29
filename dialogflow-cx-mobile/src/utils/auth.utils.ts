import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import config from '../config/app.config.json';

export class AuthUtils {
  public async setTokens(
    accessToken: string,
    tokens: Record<string, string | number>,
  ) {
    await AsyncStorage.setItem('accessToken', accessToken);

    if (tokens['accessTokenExpires']) {
      await AsyncStorage.setItem(
        'accessTokenExpires',
        tokens['accessTokenExpires'].toString(),
      );
    }

    if (tokens['refreshToken']) {
      await AsyncStorage.setItem(
        'refreshToken',
        tokens['refreshToken'].toString(),
      );
    }

    if (tokens['refreshTokenExpires']) {
      await AsyncStorage.setItem(
        'refreshTokenExpires',
        tokens['refreshTokenExpires'].toString(),
      );
    }

    if (tokens['refreshTokenExpires']) {
      await AsyncStorage.setItem(
        'refreshTokenExpires',
        tokens['refreshTokenExpires'].toString(),
      );
    }
  }

  public async getToken(): Promise<string | null> {
    const token = await AsyncStorage.getItem('accessToken');

    if (await this.isTokenExpired()) {
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      if (!refreshToken) return null;

      if (await this.isRefreshTokenExpired()) {
        const responseBody = {
          token: refreshToken,
        };

        const response =
          config.authentication.refresh.method === 'POST'
            ? await axios.post(config.authentication.refresh.url, responseBody)
            : await axios.put(config.authentication.refresh.url, responseBody);

        const tokens: Record<string, string | number> = {};

        if (response.data.accessTokenExpires) {
          tokens['accessTokenExpires'] = response.data.accessTokenExpires;
        }
        if (response.data.refreshToken) {
          tokens['refreshToken'] = response.data.refreshToken;
        }
        if (response.data.refreshTokenExpires) {
          tokens['refreshTokenExpires'] = response.data.refreshTokenExpires;
        }

        this.setTokens(response.data.accessToken, tokens);

        return response.data.accessToken;
      } else {
        return token ? token : null;
      }
    } else {
      return token ? token : null;
    }
  }

  public async isTokenExpired(): Promise<boolean> {
    const expiry = await AsyncStorage.getItem('accessTokenExpires');

    if (expiry === null) return false;
    return Date.now() > parseInt(expiry);
  }

  public async isRefreshTokenExpired(): Promise<boolean> {
    const expiry = await AsyncStorage.getItem('refreshTokenExpires');

    if (!expiry) return false;
    return Date.now() > parseInt(expiry);
  }

  public async clearTokens(): Promise<void> {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('accessTokenExpires');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('refreshTokenExpires');
  }
}
