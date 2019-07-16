import React from 'react'
import { mount, render } from 'enzyme'
import { MemoryRouter, withRouter } from 'react-router-dom'
import App from '../components/App'

jest.mock('../sample_data/recipes.json', () => ({
    results: [
      {
        "title": "Recipe",
        "href": "",
        "ingredients": "Ingredient",
        "thumbnail": "image.jpg"
      },
      {
        "title": "Other Recipe",
        "href": "",
        "ingredients": "Other Ingredient",
        "thumbnail": "image.jpg"
      }
    ]
  }), { virtual: true })

describe('App', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    test('Render recipes', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
               <App />
            </MemoryRouter>
        )
        
        expect(wrapper.find('RecipeItem').length).toEqual(2);
    })

    test('Render recipes with url filter', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/other']}>
               <App />
            </MemoryRouter>
        )
        
        expect(wrapper.find('RecipeItem').length).toEqual(1);
    })

    test('Navbar shows correct filter', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/other']}>
               <App />
            </MemoryRouter>
        )
        
        expect(wrapper.find('Navbar input').props().value).toEqual('other');
    })

    test('Change navbar value change url', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/tes']}>
               <App />
            </MemoryRouter>
        )
        
        expect(wrapper.find('Navbar').props().searchString).toEqual('tes')
        wrapper.find('Navbar input').simulate('change', { target: { value: 'test' } })
        expect(wrapper.find('Navbar').props().searchString).toEqual('test')
    })

    test('Click on recipe redirect to the right place', () => {
        const AppWithRouter = withRouter(App)

        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
               <AppWithRouter />
            </MemoryRouter>
        )
        
        const recipeRoute = wrapper.find('RecipeItem').at(1).find('Link').prop('to')
        expect(recipeRoute).toEqual('/recipe/other-recipe')
    })

    test('Render recipe in recipe route', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/recipe/other-recipe']}>
               <App />
            </MemoryRouter>
        )
        
        expect(wrapper.find('RecipePage').props())
            .toHaveProperty('recipe.title', 'Other Recipe')
    })

    test('Render to not  rend recipe in recipe route', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/recipe/invalid-recipe']}>
               <App />
            </MemoryRouter>
        )
        
        expect(wrapper.find('RecipePage').props())
            .not.toHaveProperty('recipe.title')
    })
})
