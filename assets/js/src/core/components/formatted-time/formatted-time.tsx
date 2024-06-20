/**
* Pimcore
*
* This source file is available under two different licenses:
* - Pimcore Open Core License (POCL)
* - Pimcore Commercial License (PCL)
* Full copyright and license information is available in
* LICENSE.md which is distributed with this source code.
*
*  @copyright  Copyright (c) Pimcore GmbH (http://www.pimcore.org)
*  @license    https://github.com/pimcore/studio-ui-bundle/blob/1.x/LICENSE.md POCL and PCL
*/

import React from 'react'
import { useTranslation } from 'react-i18next'

interface FormattedDateProps {
  timestamp: number
}

export const FormattedTime = (props: FormattedDateProps): React.JSX.Element => {
  const { i18n } = useTranslation()
  const formattedDate = i18n.format(
    new Date(props.timestamp),
    'datetime',
    i18n.language,
    {
      timeStyle: 'short'
    }
  )

  return (
    <>
      {formattedDate}
    </>
  )
}