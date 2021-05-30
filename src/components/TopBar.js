import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import Container from '@components/Container';
import { gray } from '@utils/colors';

export default function TopBar({ goBack }) {
  return (
    <Container>
      <TouchableOpacity onPress={goBack}>
        <ChevronLeftIcon color={gray[100]} size={36} />
      </TouchableOpacity>
    </Container>
  );
}
