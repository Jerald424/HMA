import React from 'react';
import Container from 'src/components/styled/atoms/container';
import HMAButton from 'src/components/styled/atoms/button';

import FaceSDK, {
  MatchFacesImage,
  MatchFacesRequest,
  MatchFacesResponse,
  ImageType,
} from '@regulaforensics/react-native-face-api';

import { allu1, allu2, person3, personArray } from 'src/utils/imgSample';
// Make sure these are pure base64 without the prefix

export default function Test() {
  const checkMultiple = (liveBase64, employeeList) => {
    // 1) LIVE IMAGE / SELFIE
    const liveImage = new MatchFacesImage();
    liveImage.image = liveBase64; // base64 string
    liveImage.imageType = ImageType.LIVE;

    // 2) EMPLOYEE LIST (all base64)
    const employeeImages = employeeList.map(e => {
      const img = new MatchFacesImage();
      img.image = e; // base64 string
      img.imageType = ImageType.PRINTED;
      return img;
    });

    // 3) CREATE REQUEST → first image must be live selfie
    const request = new MatchFacesRequest();
    request.images = [liveImage, ...employeeImages];

    // 4) MATCH
    FaceSDK.matchFaces(
      request,
      {},
      (responseJson: string) => {
        const response = MatchFacesResponse.fromJson(JSON.parse(responseJson));

        if (!response.results.length) {
          console.log('No results / No faces detected');
          return;
        }

        // 5) Build match list
        const matches = response.results.map((r, index) => ({
          employee: employeeList[index], // employees map 1:1 with results
          similarity: r.similarity,
        }));

        // 6) Sort best match first
        matches.sort((a, b) => b.similarity - a.similarity);

        console.log('All matches:', matches);

        // 7) BEST MATCH
        const best = matches[0];

        if (best.similarity > 0.75) {
          console.log('Best Match:', best);
        } else {
          console.log('No matching employee found');
        }
      },

      (err: any) => {
        console.log('Match error:', err);
      },
    );
  };

  const check = () => {
    const firstImage = new MatchFacesImage();
    firstImage.image = allu1;
    firstImage.imageType = ImageType.PRINTED;
    const secondImage = new MatchFacesImage();
    secondImage.image = allu2;
    secondImage.imageType = ImageType.PRINTED;

    const request = new MatchFacesRequest();
    request.images = [firstImage, secondImage];

    FaceSDK.matchFaces(
      request,
      {},
      (responseJson: string) => {
        console.log('responseJson: ', responseJson);
        const response = MatchFacesResponse.fromJson(JSON.parse(responseJson));

        if (response.results.length) {
          const result = response.results[0];
          console.log('Similarity:', result.similarity);
        }
      },
      err => console.log('Error:', err),
    );
  };

  return (
    <Container>
      <HMAButton
        title="CHECK"
        onPress={() =>
          checkMultiple(allu1, [
            allu2,
            allu2,
            allu2,
            allu2,
            allu2,
            allu2,
            allu2,
            allu2,
          ])
        }
      />
    </Container>
  );
}
