import {
  Box,
  Button,
  Container,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import ArrowIcon from './ArrowIcon';

const Hero = (): JSX.Element => {
  const { t } = useTranslation('hero');
  const router = useRouter();
  const isDefaultLocale = router.locale === router.defaultLocale;
  const colorScheme = isDefaultLocale ? 'green' : 'blue';

  return (
    <Container maxW="3xl">
      <Stack
        textAlign="center"
        spacing={{ base: 8, md: 14 }}
        py={{ base: 20, md: 36 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
          lineHeight="110%"
        >
          Make money from <br />
          <Text as="span" color={`${colorScheme}.400`}>
            your audience
          </Text>
        </Heading>
        <Text color="gray.500">
          Monetize your content by charging your most loyal readers and reward
          them loyalty points. Give back to your loyal readers by granting them
          access to your pre-releases and sneak-peaks.
        </Text>
        <Stack
          direction="column"
          spacing={3}
          align="center"
          alignSelf="center"
          position="relative"
        >
          <Button
            colorScheme={colorScheme}
            bg={`${colorScheme}.400`}
            rounded="full"
            px={6}
          >
            {t('Get Started')}
          </Button>
          <Button
            variant="link"
            colorScheme={isDefaultLocale ? 'blue' : 'green'}
            size="sm"
          >
            {t('Learn more')}
          </Button>
          <Box>
            <Icon
              as={ArrowIcon}
              color={useColorModeValue('gray.800', 'gray.300')}
              w={71}
              position="absolute"
              right={-71}
              top="10px"
            />
            <Text
              fontSize="lg"
              fontFamily="Caveat"
              position="absolute"
              right="-125px"
              top="-15px"
              transform="rotate(10deg)"
            >
              {t('Starting at {{price}}/mo', {
                price: isDefaultLocale ? '$15' : '$835',
              })}
            </Text>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Hero;
