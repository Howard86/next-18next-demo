import React from 'react';

import { Box, Container, List, ListItem } from '@chakra-ui/react';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import RouteLink from '@/components/RouteLink';

const Home = (): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{t('Index Page')}</title>
      </Head>

      <Container>
        <Box>
          {t('Current locale is {{locale}}', { locale: router.locale })}
        </Box>
        {router.locales && (
          <List>
            {router.locales.map((locale) => (
              <ListItem key={locale}>
                <RouteLink href={router.asPath} locale={locale}>
                  {locale}
                </RouteLink>
              </ListItem>
            ))}
          </List>
        )}
      </Container>
    </>
  );
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const localeProps = await serverSideTranslations(context.locale, ['common']);

  return {
    props: {
      ...localeProps,
    },
  };
};

export default Home;
