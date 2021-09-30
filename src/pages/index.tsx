import React from 'react';

import { Box, Flex, List, ListItem, Text } from '@chakra-ui/react';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Hero from '@/components/Hero';
import RouteLink from '@/components/RouteLink';

const Home = (): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();
  const colorScheme = router.locale === router.defaultLocale ? 'green' : 'blue';

  return (
    <>
      <Head>
        <title>{t('Index Page')}</title>
      </Head>

      <Box>
        <Flex
          alignItems="center"
          justify="space-between"
          bgColor={`${colorScheme}.400`}
          color="white"
          fontWeight="bold"
          py="4"
          px="8"
        >
          <Text>
            {t('Current locale is {{locale}}', { locale: router.locale })}
          </Text>
          <List display="flex">
            {router.locales?.map((locale) => (
              <ListItem
                key={locale}
                mx="2"
                color={locale === router.locale ? 'cyan' : 'white'}
              >
                <RouteLink href={router.asPath} locale={locale}>
                  {locale}
                </RouteLink>
              </ListItem>
            ))}
          </List>
        </Flex>

        <Hero />
      </Box>
    </>
  );
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const localeProps = await serverSideTranslations(context.locale, [
    'common',
    'hero',
  ]);

  return {
    props: {
      ...localeProps,
    },
  };
};

export default Home;
