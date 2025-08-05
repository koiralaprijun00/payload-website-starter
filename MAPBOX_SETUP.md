# Mapbox Integration Setup

## Overview
The project now supports interactive maps using Mapbox GL JS. When users provide GPS coordinates (latitude/longitude) for projects, an interactive map with a location pin will be displayed instead of a static image.

## Setup Instructions

### 1. Get a Mapbox Access Token
1. Go to [mapbox.com](https://mapbox.com) and create a free account
2. Navigate to your [Account page](https://account.mapbox.com/)
3. Copy your **Default public token** or create a new one

### 2. Add Environment Variable
Add the following to your `.env.local` file:

```bash
NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=pk.your-mapbox-access-token-here
```

### 3. Features
- **Interactive Map**: Pan, zoom, and explore the project location
- **Location Pin**: Red pin marker showing exact project coordinates  
- **Map Controls**: Navigation controls and fullscreen option
- **Fallback Support**: Falls back to static image if coordinates not provided
- **Responsive Design**: Works on all device sizes

### 4. Usage in Admin Panel
1. Go to **Collections → Projects**
2. Edit a project and open **Project Overview Details**
3. In **Location & Map** section:
   - **GPS Coordinates (Recommended)**: Enter latitude and longitude
   - **Location Description**: Add context about the location
   - **Static Map Image (Fallback)**: Only used if coordinates not provided

### 5. Map Styles
Currently using Mapbox's satellite-streets style for better visualization of conservation areas. You can modify the map style in `src/components/InteractiveMap.tsx`:

```typescript
mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
```

Available styles:
- `mapbox://styles/mapbox/streets-v12`
- `mapbox://styles/mapbox/outdoors-v12`
- `mapbox://styles/mapbox/light-v11`
- `mapbox://styles/mapbox/dark-v11`
- `mapbox://styles/mapbox/satellite-v9`
- `mapbox://styles/mapbox/satellite-streets-v12`

### 6. Troubleshooting
- **Map not showing**: Check that `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` is set correctly
- **Token issues**: Ensure your Mapbox token has the correct permissions
- **Coordinates**: Latitude should be between -90 and 90, longitude between -180 and 180

### 7. Free Tier Limits
Mapbox offers generous free tier limits:
- 50,000 map loads per month
- 50,000 geocoding requests per month

This should be more than sufficient for most conservation project websites.