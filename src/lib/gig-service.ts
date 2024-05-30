const baseUrl = process.env.GIG_BASE_URL;
export const GIGData = {
  username: process.env.GIG_USERNAME,
  password: process.env.GIG_PASSKEY,
};

// Interface for GIG station data
interface GIGStation {
  StationId: number;
  StationName: string;
  StationCode: string;
  StateName: string;
  StateId: number;
  Country: string;
  CountryDTO: {
    CountryId: number;
    CountryName: string;
    CountryCode: string;
    States: any[];
  };
}

// Interface for GIG shipment data
export interface GIGShipmentData {
  ReceiverAddress: string;
  CustomerCode: string;
  SenderLocality: string;
  SenderAddress: string;
  ReceiverPhoneNumber: string;
  VehicleType: string;
  SenderPhoneNumber: string;
  SenderName: string;
  ReceiverName: string;
  UserId: string;
  ReceiverStationId: string;
  SenderStationId: string;
  ReceiverLocation: {
    Latitude: string;
    Longitude: string;
  };
  SenderLocation: {
    Latitude: string;
    Longitude: string;
  };
  PreShipmentItems: {
    SpecialPackageId: string;
    Quantity: string;
    Weight: string;
    ItemType: string;
    WeightRange: string;
    ItemName: string;
    Value: string;
    ShipmentType: string;
    Description: string;
    ImageUrl: string;
  }[];
}

// Interface for GIG shipment response
interface GIGShipmentResponse {
  Code: string;
  ShortDescription: string;
  Object: {
    waybill: string;
    message: string;
    IsBalanceSufficient: boolean;
    Zone: number;
  };
  magayaErrorMessage: string;
  Cookies: any;
  more_reults: number;
  Total: number;
  RefCode: any;
}

// To handle logistics service login
export async function GIGLogin(data: typeof GIGData) {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.log("Error GIG Login", error);
    throw error;
  }
}

// To handle logistics service GET stations
export async function GIGGetStations(token: string): Promise<any> {
  try {
    const response = await fetch(`${baseUrl}/localStations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  } catch (error) {
    console.log("Error GIG Get stations", error);
    throw error;
  }
}

// To handle logistics service Capture shipment - to create a shipment request
export async function GIGCaptureShipment(
  token: string,
  data: GIGShipmentData
): Promise<GIGShipmentResponse> {
  try {
    const response = await fetch(`${baseUrl}/captureshipment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.log("Error GIG capture shipment", error);
    throw error;
  }
}

// To handle logistics service GET track shipment
export async function GIGTrackShipment(
  token: string,
  waybill_no: string
): Promise<any> {
  try {
    const response = await fetch(`${baseUrl}/TrackAllShipment/${waybill_no}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.log("Error GIG Track shipment", error);
    throw error;
  }
}
