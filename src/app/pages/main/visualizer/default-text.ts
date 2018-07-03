export const CODE_STUB = `
function fibonacci(recurse, n) {
    if(n <= 2) return 1
    return recurse(n - 1) + recurse(n - 2)
}

// export your function
entrypoint = fibonacci
`
