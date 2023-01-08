import Request from 'supertest'
import App from '../../src/server/app'

//! accept = "jest" is the same as saying accept = "text/html", the reason for this is because we can't serve html files in testing

describe('Endpoint Testing', () => {
  test("GET '/' Expecting 200 Response", async () => {
    const res = await Request(App).get('/').set('accept', 'jest')
    expect(res.statusCode).toBe(200)
    expect(res.headers['content-type']).toBe('text/html; charset=utf-8')
  })

  test("GET '/server-error' Expecting 500 Response", async () => {
    const res = await Request(App).get('/server-error')
    expect(res.statusCode).toBe(500)
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
  })

  test("GET '/bad-request' Expecting 400 Response", async () => {
    const res = await Request(App).get('/bad-request')
    expect(res.statusCode).toBe(400)
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
    expect(res.body).toMatchObject({
      status: 400,
      message: 'This is an example status error.',
      data: {
        foo: 'bar',
        bar: 'foo'
      }
    })
  })

  test("GET '/jest.asset' Expecting 404 Response", async () => {
    const res = await Request(App)
      .get('/jest.asset')
      .set('accept', 'application/json')
    expect(res.statusCode).toBe(404)
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
    expect(res.body).toMatchObject({
      status: 404,
      message: 'Not Found',
      data: {}
    })
  })
})
