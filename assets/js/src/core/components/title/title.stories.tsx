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

import { type Meta } from '@storybook/react'
import { Title } from './title'

const config: Meta = {
  title: 'Pimcore studio/UI/Title',
  component: Title,
  tags: ['autodocs']
}

export default config

export const _default = {
  args: {
    children: 'Default Title'
  }
}