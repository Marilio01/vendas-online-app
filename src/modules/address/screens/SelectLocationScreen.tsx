import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation, useRoute } from '@react-navigation/native';

import Button from '../../../shared/components/button/Button';
import { useAddress } from '../hooks/useAddress';
import { CreateAddressType } from '../../../shared/types/AddressType';

type Coords = { latitude: number; longitude: number };
type RouteParams = { address: CreateAddressType };

export default function SelectLocationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { address } = route.params as RouteParams;

  const { createAddress, addressLoading, addressErrorMessage } = useAddress();
  const [coords, setCoords] = useState<Coords | null>(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      pos => {
        setCoords({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      },
      () => {
        setCoords({ latitude: -8.409, longitude: -35.567 }); // fallback
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 5000 }
    );
  }, []);

  if (!coords) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        <meta name="viewport" content="initial-scale=1, maximum-scale=1">
        <style>body, html, #map { margin: 0; padding: 0; height: 100%; width: 100%; }</style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map').setView([${coords.latitude}, ${coords.longitude}], 16);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20
          }).addTo(map);
          L.marker([${coords.latitude}, ${coords.longitude}])
            .addTo(map)
            .bindPopup("Você está aqui!")
            .openPopup();
        </script>
      </body>
    </html>
  `;

  const handleConfirm = async () => {
    await createAddress(address);

    if (!addressErrorMessage) {
      (navigation as any).navigate('AddressList');  
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={['*']}
        source={{ html }}
        javaScriptEnabled
        domStorageEnabled
      />

      <View style={{ padding: 16 }}>
        <Button
          title="Confirmar endereço"
          onPress={handleConfirm}
          loading={addressLoading}
          disabled={addressLoading}
          variant="primary"
        />
      </View>
    </View>
  );
}
